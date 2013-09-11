
test: node_modules
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec

node_modules:
	@npm install

.PHONY: test
