pipeline {
    agent any
    stages {
        stage('git') {
            steps {
                git branch: 'dev', url: 'https://github.com/QuantumQuackDoctor/User-Portal.git'
            }
        }
        stage('Install') {
            steps {
                sh 'ng install'
            }
        }
        stage('Test') {
            steps {
                sh 'ng test'
            }
        }
        stage('Build') {
            steps {
                sh 'ng run build --prod'
            }
        }
    }
} 