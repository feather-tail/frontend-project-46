install:
	npm ci

link:
	npm link

help:
	node bin/gendiff.js -h

lint:
	npx eslint .

test:
	npm run test

test-coverage:
		npm test -- --coverage