pipeline {
  stages {
    stage('git') {
        steps {
            git branch: 'dev', url: 'https://github.com/QuantumQuackDoctor/User-Portal.git'
        }
    }
    stage('Install') {
      steps { sh 'npm install' }
    }

    stage('Test') {
        stage('Static code analysis') {
            steps { sh 'ng test' }
        }
    }
    stage('Build') {
      steps { sh 'npm run build --prod' }
    }
  }
} 