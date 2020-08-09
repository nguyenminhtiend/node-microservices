resource "aws_alb" "application_load_balancer" {
  name               = "test-alb"
  load_balancer_type = "application"
  subnets            = var.subnets
  security_groups    = [var.security_group]
  tags               = var.tags
}

resource "aws_lb_target_group" "target_group" {
  count       = length(var.services)
  name        = "${var.services[count.index].prefix}-target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id
  health_check {
    matcher = "200,201,204,301,302,304"
    path    = "/"
  }
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Path not found!"
      status_code  = "404"
    }
  }
}

resource "aws_lb_listener_rule" "rule" {
  count        = length(var.services)
  listener_arn = aws_lb_listener.listener.arn
  priority     = (count.index + 1) * 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group[count.index].arn
  }

  condition {
    path_pattern {
      values = var.services[count.index].path
    }
  }
}
