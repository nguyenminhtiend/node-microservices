resource "aws_ecs_cluster" "cluster" {
  name = "testing-cluster"
  tags = var.tags
}

resource "aws_ecs_task_definition" "task_definition" {
  count                    = length(var.services)
  family                   = "${var.services[count.index].prefix}-service"
  container_definitions    = <<DEFINITION
  [
    {
      "name": "${var.services[count.index].prefix}-service",
      "image": "${var.services[count.index].container_image}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": ${var.services[count.index].port},
          "hostPort": ${var.services[count.index].port}
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${var.log_group}",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "${var.services[count.index].prefix}"
        }
      },
      "memory": 512,
      "cpu": 256
    }
  ]
  DEFINITION
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = var.execution_role
}

resource "aws_ecs_service" "service" {
  count           = length(var.services)
  name            = "${var.services[count.index].prefix}-service"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task_definition[count.index].arn
  launch_type     = "FARGATE"
  desired_count   = var.services[count.index].number_of_tasks

  network_configuration {
    subnets = var.subnets
    //assign_public_ip = false
    security_groups = [var.security_group]
  }

  load_balancer {
    target_group_arn = var.target_groups[count.index]
    container_name   = aws_ecs_task_definition.task_definition[count.index].family
    container_port   = var.services[count.index].port
  }
}
