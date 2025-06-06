let text = "";

const stopwords = [
    "the", "and", "to", "in", "of", "a", "for", "with",
    "on", "this", "that", "it", "which", "an", "from",
    "they", "by", "its", "is", "as"
];

const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
    "type": "bar",
    "data": {},
    "options": {
        "responsive": true
    }
})

function updateChart() {
    text = document.getElementById("textInput").value;
    chart.data = getChartData(text)
    chart.update();
}

function getChartData(text, topn=30) {
    // 단어 배열 만들기
    const words = text.toLowerCase().match(/[a-z가-힣]+/g) || [];
// / 2개 내에 정규표현식 입력, g는 매치 가능한 모든 것을 보기 위한 옵션, text가 비었을 경우 대비

    // 카운터 객체 만들기 {단어: 빈도}
    const frequency = {};

    words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1; 
            // frequency 객체의 word 속성을 1씩 더해간다, 또한 객체가 빌 경우를 대비해 0을 지정
        }
    )

    // 불용어 제거
    for (stop of stopwords) {
        frequency[stop] = 0;
    }

   // 빈도 내람차순으로 정렬
   const sorted = Object.entries(frequency).sort(([,a],[,b]) => b-a);  
   // 객체인 frequency를 배열로 바꾸고, 2번째 배열의 2번째 원소 기준으로 sort

   // 상위 30개만 저장하기
   const freq_sorted = Object.fromEntries(sorted.slice(0, topn));

   // 차트용 데이터 만들기
   const chartData = {
    "labels": Object.keys(freq_sorted),
    "datasets": [
        {
            "label": "Frequency",
            "data": Object.values(freq_sorted)
        }
        ]
    };

    return chartData;
}









