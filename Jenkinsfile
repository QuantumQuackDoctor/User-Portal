pipeline {
    agent any
    tools {
        nodejs "nodejs"
    }
    stages {
        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "npm install -D sonarqube-scanner"    
                }    
            }    
        }
        stage('Quality Gate') {
            steps {
                waitForQualityGate abortPipeline= true
            }   
        }
        stage('Build') {
            steps {
                sh 'npm run build --prod'
            }
        }
        stage('Test') {
            steps {
                sh 'ng test --browsers ChromeHeadless'
            }
        }

    }
} 