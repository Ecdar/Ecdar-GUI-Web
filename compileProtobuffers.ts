import chalk from "chalk";
import fs from "fs-extra";
import { exec, execSync } from "node:child_process";

const PROTOBUFF_DIR = "./Ecdar-ProtoBuf/";
const OUT_DIR = "./src/lib/protobuf/";

export const compileProtobuffers = {
	name: "Compiling protobuffers",

	buildStart: async () => {
		await isClosed();
		await fs.ensureDir(OUT_DIR);
		const response = await Promise.all(
			(await fs.readdir(PROTOBUFF_DIR))
				.filter((file) => file.match(/.*\.proto/g))
				.map((file) =>
					runcmd(`
					  yarn protoc \\
						  --ts_out ${OUT_DIR} \\
						  --proto_path ${PROTOBUFF_DIR} \\
						  ${PROTOBUFF_DIR}${file}
					`),
				),
		);

		if (response.length === 0) {
			const err = `Failed to compile protobuffers, ${PROTOBUFF_DIR} is empty`;
			/* eslint-disable-next-line no-console -- It is okay to do this in the build phase to let the dev know what is happening */
			console.error(`${chalk.red("❌")}${err}`);
			throw new Error(err);
		}

		/* eslint-disable-next-line no-console -- It is okay to do this in the build phase to let the dev know what is happening */
		console.log(`${chalk.green("✔")} Compiled Protobuffers: Done`);
	},
};

function runcmd(cmd: string): Promise<void> {
	return new Promise((resolve, reject) => {
		exec(cmd, (err, stdout, stderr) => {
			if (err !== null) {
				const reducedCmd = cmd
					.replace(/\\.*\n/g, "")
					.replace(/\s+/g, " ");
				reject(
					`Protobuff command failed\ncmd:\n${reducedCmd}\nstdout:\n${stdout}\nstderr:\n${stderr}`,
				);
			}
			resolve();
		});
	});
}

async function isClosed() {
	let timeout = 0;
	for (;;) {
		try {
			execSync("yarn protoc --version");
			break;
		} catch {
			await sleep(1000);
			if (++timeout > 10)
				throw new Error("Execute yarn protoc exited timeout");
		}
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}
