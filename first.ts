console.log("first");
// 아래는 실무 수준에서 범용적으로 쓰이는 환영 함수입니다
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
