#容器名称 gitlab-runner-{项目名}-{序号}
#容器路径 /data/gitlab/gitlab-runner/{项目名}-{序号}

docker run -d --name gitlab-runner-sample --restart always \
  -v /data/gitlab/gitlab-runner/sample:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
