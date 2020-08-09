tags = {
  Developer = "Tien Nguyen"
  Environment = "Development"
  CostCenter = "Admin"
}

services = [
  {
    prefix = "user"
    container_image = "621567429603.dkr.ecr.ap-southeast-1.amazonaws.com/user-service:latest"
    port = 3000
    path = ["/user/*"]
    number_of_tasks = 1
  }
  # {
  #   prefix = "auth"
  #   container_image = "621567429603.dkr.ecr.ap-southeast-1.amazonaws.com/auth-service:latest"
  #   port = 3001
  #   path = ["/auth/*"]
  #   number_of_tasks = 1
  # }
]