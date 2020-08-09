# gcloud container clusters create messi-cluster \
#       --num-nodes=1 \
#       --disk-type=pd-standard \
#       --disk-size=10GB \
gcloud container clusters create messi-cluster
#gcloud container clusters resize my-cluster --num-nodes=1
#gcloud container clusters get-credentials messi-cluster