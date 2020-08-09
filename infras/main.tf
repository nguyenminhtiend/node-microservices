provider "aws" {
  region  = var.region
  profile = "default"
}

# module "ecr" {
#   source  = "./ecr"
#   tags = var.tags
# }

module "vpc" {
  source = "./vpc"
  tags   = var.tags
}

module "iam" {
  source = "./iam"
}

module "cloudwatch" {
  source    = "./cloudwatch"
  log_group = var.log_group
  tags      = var.tags
}

module "alb" {
  source         = "./alb"
  vpc_id         = module.vpc.vpc_id
  subnets        = module.vpc.public_subnets
  security_group = module.vpc.alb_sg
  services       = var.services
  tags           = var.tags
}

module "ecs" {
  source         = "./ecs"
  execution_role = module.iam.execution_role_arn
  services       = var.services
  subnets        = module.vpc.private_subnets
  target_groups  = module.alb.target_groups
  security_group = module.vpc.ecs_sg
  log_group      = var.log_group
  tags           = var.tags
}
