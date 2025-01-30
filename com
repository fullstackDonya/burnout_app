
docker-compose up -d 


htpasswd -Bc auth/htpasswd admin 
htpasswd -B auth/htpasswd newuser
docker run -d -p 5000:5000 --name docker-registry registry:2
curl http://localhost:5000/v2/_catalog
docker run -d -p 5001:5000 --name registry registry:2 
docker run -d -p 5000:5000 --name registry registry:2



  
docker-compose down 
kubectl apply -f nginx-pod.yaml
kubectl apply -f nginx-srv.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
kubectl apply -f mongo-data.yaml  

kubectl apply -f apache-pod.yaml
kubectl apply -f apache-service.yaml

kubectl get pods
kubectl get svc
kubectl get deployments
kubectl get pv
kubectl get pvc


kubectl get pods -n ingress-nginx
kubectl get pods -n ingress-nginx

kubectl get svc -n ingress-nginx
kubectl get svc
kubectl describe ingress <nom_ingress>
kubectl apply -f <fichier.yaml>
kubectl delete -f <fichier.yaml>

kubectl get pods -n <namespace> -w
kubectl get svc -n <namespace> -w
kubectl get deployments -n <namespace> -w
kubectl get ingress -n <namespace> -w
kubectl logs -n <namespace> <nom_du_pod> -f
kubectl get pv
kubectl get pvc
kubectl get secrets
kubectl get configmaps
kubectl get storageclass
kubectl get nodes
kubectl get namespaces
kubectl get pods --all-namespaces
kubectl get svc --all-namespaces
kubectl get deployments --all-namespaces
kubectl get ingress --all-namespaces
kubectl get pv --all-namespaces
kubectl get pvc --all-namespaces
kubectl get secrets --all-namespaceS

kubectl get pods -n ingress-nginx
kubectl get pods -n ingress-nginx

minikube tunnel

kubectl logs -n ingress-nginx ingress-nginx-controller-974f4cbd8-qpd26
kubectl logs -n ingress-nginx ingress-nginx-controller-974f4cbd8-qpd26
kubectl get svc

Vérifier et tester l'Ingress :
Une fois le tunnel Minikube activé, vérifiez à nouveau l'Ingress et accédez à vos services via les chemins définis dans le fichier ingress.yml :

Apache : http://localhost/apache
Nginx : http://localhost/nginx

1. Vérifier les namespaces disponibles
kubectl get namespaces
Note : Permet de voir les namespaces actifs dans le cluster Kubernetes. Par défaut, vous verrez des namespaces comme default, kube-system, kube-public.

2. Supprimer un namespace
kubectl delete namespace ingress-nginx
Note : Supprime le namespace spécifié (ingress-nginx dans ce cas). Cela entraîne également la suppression de toutes les ressources dans ce namespace.

3. Réinstaller NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
Note : Télécharge et applique la configuration pour déployer NGINX Ingress Controller. Cela crée un namespace ingress-nginx et toutes les ressources nécessaires (services, déploiements, etc.).

4. Lister les pods dans un namespace
kubectl get pods -n ingress-nginx
Note : Vérifie que les pods de NGINX Ingress Controller sont en cours d'exécution dans le namespace ingress-nginx.

5. Démarrer un tunnel avec Minikube
minikube tunnel
Note : Configure un tunnel pour exposer les services de type LoadBalancer localement. Nécessite des droits sudo pour ouvrir les ports 80 et 443.

6. Afficher les logs d'un pod
kubectl logs -n ingress-nginx <nom_du_pod>
Exemple :
kubectl logs -n ingress-nginx ingress-nginx-controller-974f4cbd8-qpd26
Note : Permet de consulter les logs d'un pod spécifique pour vérifier son état ou déboguer des problèmes.

7. Lister les services dans le cluster
kubectl get svc
Note : Affiche tous les services Kubernetes. Les colonnes incluent :
NAME : Nom du service.
TYPE : Type (ClusterIP, NodePort, LoadBalancer).
CLUSTER-IP : IP interne du service.
EXTERNAL-IP : IP externe, si applicable.
PORT(S) : Ports exposés par le service.
AGE : Temps écoulé depuis la création du service.

8. Vérifier l'état d'un Ingress
kubectl describe ingress <nom_ingress>
Note : Affiche les détails d'une ressource Ingress, y compris les règles, les annotations, et les erreurs éventuelles.

9. Appliquer une configuration YAML
kubectl apply -f <fichier.yaml>
Note : Applique les configurations spécifiées dans un fichier YAML (par exemple, pour un déploiement, un service ou un Ingress).

10. Supprimer une ressource
kubectl delete -f <fichier.yaml>
Note : Supprime les ressources définies dans un fichier YAML.

11. Surveiller l'état des pods
kubectl get pods -n <namespace> -w
Note : Ajoutez l'option -w pour surveiller les changements en temps réel.

12. Surveiller l'état des services
kubectl get svc -n <namespace> -w
Note : Ajoutez l'option -w pour surveiller les changements en temps réel.

13. Surveiller l'état des déploiements
kubectl get deployments -n <namespace> -w
Note : Ajoutez l'option -w pour surveiller les changements en temps réel.

14. Surveiller l'état des Ingress
kubectl get ingress -n <namespace> -w
Note : Ajoutez l'option -w pour surveiller les changements en temps réel.

15. Surveiller les logs d'un pod
kubectl logs -n <namespace> <nom_du_pod> -f
Note : Ajoutez l'option -f pour suivre les logs en temps réel.

16. Vérifier l'état des Persistent Volumes (PV)
kubectl get pv
Note : Affiche les informations sur les Persistent Volumes disponibles dans le cluster.

17. Vérifier l'état des Persistent Volume Claims (PVC)
kubectl get pvc
Note : Affiche les informations sur les Persistent Volume Claims (demandes de volumes persistants) dans le cluster.

18. Vérifier l'état des secrets
kubectl get secrets
Note : Affiche les secrets disponibles dans le cluster.

19. Vérifier l'état des ConfigMaps
kubectl get configmaps
Note : Affiche les ConfigMaps disponibles dans le cluster.

20. Vérifier l'état des services de stockage
kubectl get storageclass
Note : Affiche les classes de stockage disponibles dans le cluster.

21. Vérifier l'état des nodes
kubectl get nodes
Note : Affiche les nodes (nœuds) disponibles dans le cluster.

22. Vérifier l'état des namespaces
kubectl get namespaces
Note : Affiche les namespaces disponibles dans le cluster.

23. Vérifier l'état des pods dans tous les namespaces
kubectl get pods --all-namespaces
Note : Affiche les pods de tous les namespaces.

24. Vérifier l'état des services dans tous les namespaces
kubectl get svc --all-namespaces
Note : Affiche les services de tous les namespaces.

25. Vérifier l'état des deployments dans tous les namespaces
kubectl get deployments --all-namespaces
Note : Affiche les déploiements de tous les namespaces.

26. Vérifier l'état des Ingress dans tous les namespaces
kubectl get ingress --all-namespaces
Note : Affiche les Ingress de tous les namespaces.

27. Vérifier l'état des Persistent Volumes (PV) dans tous les namespaces
kubectl get pv --all-namespaces
Note : Affiche les Persistent Volumes de tous les namespaces.

28. Vérifier l'état des Persistent Volume Claims (PVC) dans tous les namespaces
kubectl get pvc --all-namespaces
Note : Affiche les Persistent Volume Claims de tous les namespaces.

29. Vérifier l'état des secrets dans tous les namespaces
kubectl get secrets --all-namespaceS
Note : Affiche les secrets de tous les namespaces.


Résumé du processus typique :
Vérifiez les namespaces et supprimez si nécessaire (kubectl get namespaces, kubectl delete namespace).
Déployez ou reconfigurez NGINX Ingress Controller (kubectl apply).
Vérifiez l'état des pods et services (kubectl get pods, kubectl get svc).
Configurez un tunnel si nécessaire (Minikube).
Déployez vos ressources applicatives (services, déploiements, Ingress).
Surveillez les logs et l'état pour assurer un bon fonctionnement.
