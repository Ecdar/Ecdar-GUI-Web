export function validateName(name: string | undefined): boolean {
	if (name != "" && name !== undefined) return true;
	return false;
}

export function validateIP(ipAdress: string): boolean {
	return URL.canParse(ipAdress);
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
