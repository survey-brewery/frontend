import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-survey-analytic',
  templateUrl: './user-survey-analytic.component.html',
  styleUrls: ['./user-survey-analytic.component.scss']
})
export class UserSurveyAnalyticComponent implements OnInit {
  public chart!: Chart<"bar" | "pie", number[], unknown>;
  public chart2!: Chart<"bar" | "pie", number[], unknown>;
  surveyDetails: any = {};
  @ViewChildren('answerContainer') answerContainers!: QueryList<ElementRef>;
  constructor(
    private _userService: UserService, 
    private route: ActivatedRoute,
    private location:Location) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.getAllCounts(res.id);
    });
  }

  getAllCounts(id: any) {
    this._userService.getFillSurveyResponse(id).subscribe({
      next: (res: any) => {
        if (res) {
          this.surveyDetails = res.data;
          Chart.register(ChartDataLabels);
          res.data.questions.forEach((question: any, index: number) => {
            const options = question.options;
            const valueLabels = options.map((item: any) => item.value);
            const counts = options.map((item: any) => item.count);
            const colors = ['#FF6262', '#00B086', '#FBC108', '#5C80BC', '#AF52DE', '#A2845E', '#32ADE6', '#FF9500'];
  
            const canvasId = `chartCanvas${index}`;
            setTimeout(() => {
              const chartCanvas = document.getElementById(canvasId) as HTMLCanvasElement;
              const chartContext = chartCanvas?.getContext('2d');
  
              if (chartContext) {
                // Common chart options with datalabels plugin
                const commonOptions: any = {
                  plugins: {
                    legend: {
                      display: question.input_type !== 'checkbox', // Hide legend for bar charts
                      position: "right"
                    },
                    datalabels: {  // Enable data labels plugin
                      color: '#000',  // Label color
                      anchor: 'center',
                      align: 'center',
                      formatter: (value: any) => value,  // Display the raw count
                      font: {
                        weight: 'bold',
                        size: '14px'
                      }
                    }
                  },
                  animation: {
                    delay: (context: any) => {
                      let delay = 0;
                      if (context.type === 'data' && context.mode === 'default') {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                      }
                      return delay;
                    }
                  }
                };
  
                // Create pie chart for radio button type questions
                if (question.input_type === 'radio') {
                  new Chart(chartContext, {
                    type: 'pie',
                    data: {
                      labels: valueLabels,
                      datasets: [{
                        data: counts,
                        backgroundColor: colors,
                        borderWidth: 1
                      }]
                    },
                    plugins: [ChartDataLabels],
                    options: commonOptions
                  });
                }
  
                // Create bar chart for checkbox type questions
                else if (question.input_type === 'checkbox') {
                  new Chart(chartContext, {
                    type: 'bar',
                    data: {
                      labels: valueLabels,
                      datasets: [{
                        label: "Counts",
                        data: counts,
                        backgroundColor: colors,
                        borderWidth: 1
                      }]
                    },
                    options: {
                      ...commonOptions,
                      indexAxis: 'y', // Horizontal bar chart
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    },
                    plugins: [ChartDataLabels],
                  });
                }
              }
            }, 100); // Give the DOM some time to render
          });
        }
      }
    });
  }
  goToBack(){
    this.location.back();
  }
}
