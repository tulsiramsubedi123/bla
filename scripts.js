// Define Exercise class with heart rate
class Exercise {
    constructor(exercise, calories, heartRate) {
        this.exercise = exercise;
        this.calories = calories;
        this.heartRate = heartRate;
    }
}

// Define FitnessTracker class
class FitnessTracker {
    constructor() {
        this.exercises = JSON.parse(localStorage.getItem('exercises')) || [];
        this.render();
    }

    // Method to add exercise with heart rate
    addExercise(exercise, calories, heartRate) {
        const newExercise = new Exercise(exercise, calories, heartRate);
        this.exercises.push(newExercise);
        this.saveExercises();
        this.render();
    }

    // Method to save exercises to local storage
    saveExercises() {
        localStorage.setItem('exercises', JSON.stringify(this.exercises));
    }

    // Method to render UI
    render() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div>
                <input type="text" id="exercise" placeholder="Exercise">
                <input type="number" id="calories" placeholder="Calories">
                <input type="number" id="heartRate" placeholder="Heart Rate">
                <button id="trackBtn">Track Exercise</button>
            </div>
            <div id="chartContainer">
                <canvas id="exerciseChart"></canvas>
            </div>
        `;
        const trackBtn = document.getElementById('trackBtn');
        trackBtn.addEventListener('click', () => {
            const exercise = document.getElementById('exercise').value.trim();
            const calories = parseInt(document.getElementById('calories').value.trim());
            const heartRate = parseInt(document.getElementById('heartRate').value.trim());
            if (exercise && !isNaN(calories) && calories > 0 && !isNaN(heartRate) && heartRate > 0) {
                this.addExercise(exercise, calories, heartRate);
            } else {
                alert('Please enter valid exercise, calories, and heart rate.');
            }
        });
        this.renderChart();
    }

    // Method to render chart
    renderChart() {
        const chartContainer = document.getElementById('exerciseChart');
        const ctx = chartContainer.getContext('2d');
        const labels = this.exercises.map(exercise => exercise.exercise);
        const data = this.exercises.map(exercise => exercise.calories);
        const heartRates = this.exercises.map(exercise => exercise.heartRate);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Calories Burned',
                    data: data,
                    backgroundColor: '#4caf50',
                    borderColor: '#4caf50',
                    borderWidth: 1
                }, {
                    label: 'Heart Rate',
                    data: heartRates,
                    backgroundColor: '#2196f3',
                    borderColor: '#2196f3',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

// Instantiate FitnessTracker
const fitnessTracker = new FitnessTracker();
