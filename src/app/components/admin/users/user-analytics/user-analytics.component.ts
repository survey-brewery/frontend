import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/components/user/user.service';

@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.scss'],
})
export class UserAnalyticsComponent {
  survey_id: any;
  userDetails: any = {};
  totalFillSurvey = 0;
  page: number = 1;
  pageSize: number = 10;
  total: any;
  title = 'ng-chart';
  chart: any = [];
  allUserList: Array<any> = [];
  chart2: any = [];
  fillSurveyDetails: any = {};

  constructor(
    private _userService: UserService,
    private url: ActivatedRoute,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.survey_id = this.url.snapshot.params['id'];
    this.route.params.subscribe((res: any) => {
      this.getUserListBySurveyId(res.id);
      this.userAnalyticsDetails(res.id);
    });
  }

  romanize(num: number) {
    const romanNumerals: { [key: string]: number } = {
      l: 50,
      xl: 40,
      x: 10,
      ix: 9,
      v: 5,
      iv: 4,
      i: 1,
    };

    let roman = '';
    for (let key in romanNumerals) {
      while (num >= romanNumerals[key]) {
        roman += key;
        num -= romanNumerals[key];
      }
    }
    return roman;

  }
  userAnalyticsDetails(id: any) {
    this._userService
      .getFillSurveyResponse(this.survey_id)
      .subscribe((res: any) => {
        if(res){
        this.userDetails = res.survey_details;
        this.totalFillSurvey = res.survey_fill_count;


        // Bar Chart
        const barChartCanvas = document.getElementById(
          'barChartCanvas'
        ) as HTMLCanvasElement;
        const barChartContext: any = barChartCanvas.getContext('2d');
        this.chart = new Chart(barChartContext, {
          type: 'bar',
          data: {
            labels: res.fill_count_by_date.map((item: any) => item.day),
            datasets: [
              {
                label: 'Survey Fill Count',
                data: res.fill_count_by_date.map(
                  (item: any) => item.surveyFillCount
                ),
                backgroundColor: 'rgba(70, 130, 180, 0.6)', // Use a darker shade of blue
                borderColor: 'rgba(70, 130, 180, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Survey Fill Count by Date',
                position: 'bottom',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Survey Fill Count',
                },
              },
            },
            animation: {
              onComplete: () => { },
              delay: (context) => {
                let delay = 0;
                if (
                  context.type === 'data' &&
                  context.mode === 'default' &&
                  !delay
                ) {
                  delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
              },
            },
          },
        });


        //Pie Chart
        const pieChartCanvas = document.getElementById('pieChartCanvas') as HTMLCanvasElement;
        const pieChartContext: any = pieChartCanvas.getContext('2d');

        const professionFills = res.profession_fills;
        const professionLabels = professionFills.map((item: any) => item.profession);
        const professionCounts = professionFills.map((item: any) => item.surveyFillCount);

        // Generate random colors for the pie chart
        const backgroundColors = generateRandomColors(professionLabels.length, 0.6); // Use a darker shade
        const borderColors = generateRandomColors(professionLabels.length, 1);

        this.chart2 = new Chart(pieChartContext, {
          type: 'pie',
          data: {
            labels: professionLabels,
            datasets: [
              {
                label: 'Survey Fill Count',
                data: professionCounts,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
              }
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Survey Fill Count by Profession',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
              legend: {
                display: true,
              },
            }, animation: {
              onComplete: () => {

              },
              delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delay) {
                  delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
              },
            },
          },

        });

        // Function to generate random colors
        function generateRandomColors(count: number, alpha: number): string[] {
          const colors: string[] = [];
          for (let i = 0; i < count; i++) {
            const color = `rgba(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()}, ${alpha})`;
            colors.push(color);
          }
          return colors;
        }

        // Function to get random value between 0 and 255
        function getRandomValue(): number {
          return Math.floor(Math.random() * 256);
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

}

