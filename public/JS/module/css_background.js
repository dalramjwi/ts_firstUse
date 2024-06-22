//!임시 변수명 설정
/**
 * product : 자판기에 재화를 통해 선택해 생긴 상품
 * backimg : 변경될 background에 들어갈 img
 */
/**
 * 상품이 생성되면 (DOM API) 해당 상품의 div id를 서버로 전송한다.
 * 서버에서 db를 통해 해당하는 상품을 찾고, 상품에 대한 정보를 js에 전달한다.
 * 전달된 값을 토대로 backimg를 변경한다.
 */
const product = document.getElementById("product");
