# runner中的执行器需要操作k8s集群，创建pod，svc。因此需要在runner所在服务器安装kubectl，并且导入k8s访问认证信息。
# 以下是从k8s集群中将相关文件直接复制进行修改，以免在网上下载。
mkdir -p /usr/local/bin/
mkdir -p /root/.kube/

scp -r root@10.20.91.101:/usr/local/bin/kubectl/ /usr/local/bin/
scp root@10.20.91.101:/root/.kube/config /root/.kube/

echo "10.20.91.101  lb.kubesphere.local" >> /etc/hosts
 
