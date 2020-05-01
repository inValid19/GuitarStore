package com.example.webservice1;

public class UserAuth {

        private String status;

        public UserAuth(String status) {
                this.status = status;
        }
        public String getStatus() {
                return status;
        }
        public void setStatus(String status) {
                this.status = status;
        }
}