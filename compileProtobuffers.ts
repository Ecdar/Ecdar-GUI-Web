import fs from "fs-extra";
import { exec } from "node:child_process";

const PROTOBUFF_DIR = "./Ecdar-ProtoBuf/";
const OUT_DIR = "./src/lib/proto/";

export const compileProtobuffers = {
	name: "Compiling protobuffers",

	buildStart: async () => {
		await Promise.all(
			(await fs.readdir(PROTOBUFF_DIR))
				.filter((file) => file.match(/.*\.proto/g))
				.map((file) =>
					runcmd(`
					  npx protoc \\
						  --ts_out ${OUT_DIR} \\
						  --proto_path ${PROTOBUFF_DIR} \\
						  ${PROTOBUFF_DIR}/${file}
					`),
				),
		);
		console.log("\x1b[33m✔\x1b[0m Compiled Protobuffers Done");
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
