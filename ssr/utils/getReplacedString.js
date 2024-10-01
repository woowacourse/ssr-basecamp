/**
 * 문자열에서 특정 값을 다른 값으로 교체하는 함수
 * @param {string} string - 원본 문자열
 * @param {[string|RegExp, string][]} changeArray - 교체할 값의 배열, 각 요소는 [검색값, 교체값] 형태
 * @returns {string} 교체가 완료된 문자열
 */
export default function getReplacedString(string, changeArray) {
  return changeArray.reduce((beforeString, [searchValue, replaceValue]) => {
    return beforeString.replace(searchValue, replaceValue);
  }, string);
}
