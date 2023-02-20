# Engine Controller

Things controller is responsible for

- as soon as a workspace is CREATED:

  - gateway has to have a unique URL (service)
  - it should have a service, deployment and hpa

- one ingress for all deployments will be updated accordingly:

  - route1(uniqueURL) -> service1 (gateway1)
  - route2(uniqueURL) -> service2 (gateway2)

Controller operations:

- when a workspace is CREATED/DELETED:

  - controller creates engine-gateway:
    - deployment (1:1 ws engine-gateway mapping)
      - name: workspace slug
    - service
      - name: same as deployment name
    - updates ingress

- whenever an extension is CREATED/UPDATED/DELETED_ALL:
  - restart the engine-gateway (rolling upgrade)
  - check if respective extension k8s package is up or not
    - if not: create
    - else: delete all
