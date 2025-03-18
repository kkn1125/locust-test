from locust import HttpUser, task

baseUrl = "http://localhost:8080/api"


class HelloWorldUser(HttpUser):
    @task
    def hello_world(self):
        self.client.post(
            "/auth/login",
            {"email": "chaplet01@gmail.com", "password": "qweQQ!!1"},
        )
        self.client.get("/users")
