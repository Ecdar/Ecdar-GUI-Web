import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

let dir = path.dirname(fileURLToPath(import.meta.url));
let out_dir = `${dir}/src/lib/proto`;

if (!fs.existsSync(out_dir)) fs.mkdirSync(out_dir);

fs.readdir(`${dir}/Ecdar-ProtoBuf`, (err, files) => {
	if (err !== null) throw err;
	for (let file of files.filter((name) => name.match(/.*\.proto/g))) {
		const cmd = `npx protoc --ts_out ${out_dir} --proto_path ${dir}/Ecdar-ProtoBuf ${dir}/Ecdar-ProtoBuf/${file}`;
		execSync(cmd, (err, stdout, stderr) => {
			console.log(`Executing commmand: "${cmd}"`);
			if (stdout !== null) console.log(stdout);
			if (stderr !== null) console.error(stderr);
			if (err !== null) console.error(err);
		});
	}

	console.log("Finnished compiling protobuffers");
});
