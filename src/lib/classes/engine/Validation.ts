const regexTest: RegExp = new RegExp(
	"^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
);

export function validateName(name: string | undefined): boolean {
	if (name != "" && name !== undefined) return true;
	return false;
}

export function validateIP(ipAdress: string): boolean {
	return regexTest.test(ipAdress);
}

export function validateStartPort(port: number): boolean {
	return 0 <= port && port <= 65353;
}

export function validateEndPort(port: number): boolean {
	return 0 <= port && port <= 65353;
}

export function comparePortRange(start: number, end: number): boolean {
	return start <= end;
}
