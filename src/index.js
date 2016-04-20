import { Base } from 'yeoman-generator';
import { join, basename } from 'path';

function askFor(name, message, _default) {
	const required = !!_default;

	return {
		type: 'input',
		name, message, required, default: _default
	};
}

module.exports = class Generator extends Base {
	constructor(...args) {
		super(...args);
	}

	_copy(src, dest, model = {}) {
		this.log(`Copying ${this.templatePath(src)} => ${this.destinationPath(dest)}`);
		this.fs.copyTpl(
			this.templatePath(src),
			this.destinationPath(dest),
			model
		);
	}

	prompting() {
		const self = this;
		const done = self.async();
		const prompts = [
			askFor('appname', 'Project name', self.appname),
			askFor('description', 'Description', 'Your description here'),
			askFor('author', 'Author', 'Captain Anonymous'),
			askFor('source', 'Source ES2015 folder', 'src')
		];

		self.prompt(prompts, answers => {
			let { appname, description, author, source } = answers;
			self.choices = { appname, description, author, src: source };

			// create the folder if the appname isn't the same as the current folder
			const currentRoot = self.destinationRoot();
			const currentFolder = basename(currentRoot);

			if (currentFolder !== appname) {
				const newRoot = join(currentRoot, appname);
				this.log(`Since the current folder ${currentFolder} isn't the same as the application name ${appname}, ${newRoot} will be created.`);
				self.destinationRoot(newRoot);
			}

			done();
		});
	}

	writing() {
		const self = this;
		const { appname, description, author, src } = self.choices;

		const srcmain = join('.', src, 'index.js');
		const srcpath = join('.', src);

		try {
			self._copy('.babelrc', '.babelrc');
			self._copy('.eslintrc', '.eslintrc');
			self._copy('.gitig', '.gitignore');
			self._copy('package.json', 'package.json', {
				appname, description, author, srcmain, srcmain, srcpath
			});
			self._copy('src/index.js', srcmain, { author });
		} catch (err) {
			console.error(err.stack);
		}
	}

	install() {
		this.installDependencies();
	}
}
