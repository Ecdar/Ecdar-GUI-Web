import chalk from "chalk";
import fs from "fs-extra";
import { flockSync } from "fs-ext";
import { exec } from "node:child_process";

const PROTOBUFF_DIR = "./Ecdar-ProtoBuf/";
const OUT_DIR = "./src/lib/protobuf/";

export const compileProtobuffers = {
	name: "Compiling protobuffers",

	buildStart: async () => {
		await isClosed();
		await fs.ensureDir(OUT_DIR);
		await Promise.all(
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
		console.log(`${chalk.green("✔")} Compiled Protobuffers: Done`);
	},
};

function runcmd(cmd: string): Promise<void> {
	return new Promise((res, rej) => {
		exec(cmd, (err, stdout, stderr) => {
			if (err !== null) {
				const reducedCmd = cmd
					.replace(/\\.*\n/g, "")
					.replace(/\s+/g, " ");
				console.error(`Protobuff command failed\ncmd:\n${reducedCmd} `);
				console.error(`stdout:\n${stdout}`);
				console.error(`stderr:\n${stderr}`);
				rej();
			}
			res();
		});
	});
}

function isClosed(): Promise<void> {
	return new Promise((res) => {
		fs.open("./node_modules/.bin/protoc", "w+")
			.then((fd) => {
				for (;;) {
					try {
						flockSync(fd, "ex");
						fs.close(fd)
							.then(() => {})
							.catch(() => {});
						res();
						break;
					} catch {
						[]; // NO EMPTY BLOCK STATEMENTS :)
					}
				}
			})
			.catch(() => {
				throw new Error("Forgot to call yarn install");
			});
	});
}
