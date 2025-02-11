  /** format URL for Match Detail */

export default function FormatMatchDetailURL(home: string, away: string, matchID: number, locale:string) {
    const matchVS = `${home}-vs-${away}`;

    // 하이픈을 모두 삭제합니다.
    const noHyphens = matchVS.replace(/-/g, " ");

    // 두 번 이상의 연속 공백을 하나로 줄입니다.
    const cleanedString = noHyphens.replace(/\s{2,}/g, " ");

    // 1. 공백을 하이픈으로 변경
    const hyphenated = cleanedString.replace(/\s+/g, "-");

    // 2. 온점을 제거
    const withoutDots = hyphenated.replace(/\./g, "");

    // 3. 대문자 뒤에 하이픈 추가 (선택 사항)
    const withHyphens = withoutDots.replace(/(?<=[A-Z])-(?=[a-z])/g, "-");

    // 4. 소문자로 변환
    const name = withHyphens.toLowerCase();

    /** 최종 */
    const url = `/${locale}/matches/${name}/${matchID}`;

    return url;

}