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
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'ng test --browsers ChromeHeadless'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build --prod'
            }
        }
    }
} 