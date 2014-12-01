SRC = lib/index.js

include node_modules/make-lint/index.mk

LINT_CONFIG = .eslintrc
TESTS = test/index.js

test: lint
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- -u exports \
		--require should \
		$(TESTS) \
		--bail

test-travis:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		--require should \
		$(TESTS) \
		--bail

example: example-build
	@open example/index.html
	@node node_modules/.bin/http-server \
		--cors

example-build:
	@rm -rf build/
	@mkdir build/
	@node example/make.js

.PHONY: test example
