output "alb" {
  value = "${aws_alb.application_load_balancer.arn}"
}

output "target_groups" {
  value = [
    for target_group in aws_lb_target_group.target_group :
    "${target_group.arn}"
  ]
  depends_on = [
    aws_alb.application_load_balancer
  ]
}
