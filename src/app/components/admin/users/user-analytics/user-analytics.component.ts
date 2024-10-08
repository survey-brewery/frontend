import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/components/user/user.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ViewSurveyorAnswerComponent } from '../../view-surveyor-answer/view-surveyor-answer.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.scss'],
})
export class UserAnalyticsComponent {
  survey_id: any;
  userDetails: any = {};
  page: number = 1;
  pageSize: number = 10;
  total: any;
  allUserList: Array<any> = [];
  fillSurveyDetails: any = {};
  totalFillSurvey=0
  
  public chart!: Chart<"bar" | "pie", number[], unknown>;
  public chart2!: Chart<"bar" | "pie", number[], unknown>;
  surveyDetails: any = {};
  @ViewChildren('answerContainer') answerContainers!: QueryList<ElementRef>;
  constructor(
    private _userService: UserService,
    private url: ActivatedRoute,
    private route: ActivatedRoute,
    private dialog:MatDialog,
    private location:Location
  ) { }
  ngOnInit(): void {
    this.survey_id = this.url.snapshot.params['id'];
    this.route.params.subscribe((res: any) => {
      this.getUserListBySurveyId(res.id);
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
  getUserListBySurveyId(id: any) {
    this._userService.getUserListSurveyId(id).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.allUserList = res.data;
        }
      }
    })
  }
  fillSurveyViewById(id: any) {
    this._userService.fillSurveyViewById(id).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.fillSurveyDetails = res.data;
        }
      },
    });
  }
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(ViewSurveyorAnswerComponent, {
      data: data,
      width: '744px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((message: string) => {
      if (message == 'create' || message == 'update') {
      } else {
        console.log('nothing happen');
      }
    });
  }
  goToBack(){
    this.location.back();
  }
}

