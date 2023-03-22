docker run \
 -itd  \
 -p 9980:9980 \
 -p 9922:22 \
 -v /data/gitlab/15.8.0/config:/etc/gitlab  \
 -v /data/gitlab/15.8.0/logs:/var/log/gitlab \
 -v /data/gitlab/15.8.0/data:/var/opt/gitlab \
 --restart always \
 --privileged=true \
 --name gitlab15.8.0 \
 gitlab/gitlab-ce:15.8.0-ce.0