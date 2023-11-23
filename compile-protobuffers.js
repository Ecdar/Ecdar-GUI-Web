import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

let dir = path.dirname(fileURLToPath(import.meta.url));
let out_dir = `${dir}/src/lib/proto`;

if (!fs.existsSync(out_dir)) fs.mkdirSync(out_dir);

async function main() {
	let files = await readdir(`${dir}/Ecdar-ProtoBuf`);
	await Promise.all(
		files
			.filter((name) => name.match(/.*\.proto/g))
			.map((file) =>
				runCmd(`
		  npx protoc \\
			  --ts_out ${out_dir} \\
			  --proto_path ${dir}/Ecdar-ProtoBuf \\
			  ${dir}/Ecdar-ProtoBuf/${file}
		  `),
		),
	);
	console.log("Finnished compiling protobuffers");
}

function readdir(dir) {
	return new Promise((res, rej) => {
		fs.readdir(dir, (err, files) => {
			if (err !== null) rej(err);
			else res(files);
		});
	});
}

function runCmd(cmd) {
	return new Promise((res, _) => {
		console.log(`Executing commmand: "${cmd}"`);
		exec(cmd, (err, stdout, stderr) => {
			if (stdout !== null) console.log(stdout);
			if (stderr !== null) console.error(stderr);
			if (err !== null) console.error(err);
			res();
		});
	});
}

main();
