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
                sh 'npm test --global run-headless'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build --prod'
            }
        }
    }
} 