  /** Formatted League Name or Team Name for URL */

export default function FormatLeagueOrTeamName(leagueName:string) {

    // remove all hyphens
    const noHyphens = leagueName.replace(/-/g, " ");

    // Reduce two or more spaces to a single space.
    const cleanedString = noHyphens.replace(/\s{2,}/g, " ");

    // Replace spaces with hyphens.
    const hyphenated = cleanedString.replace(/\s+/g, "-");

    // Remove dots
    const withoutDots = hyphenated.replace(/\./g, "");

    // Add a hyphen after uppercase letters
    const withHyphens = withoutDots.replace(/(?<=[A-Z])-(?=[a-z])/g, "-");

    // Change to lowercase
    const name = withHyphens.toLowerCase();

    return name;
}