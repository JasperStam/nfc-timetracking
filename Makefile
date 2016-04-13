error: FORCE
	@echo "Please choose one of the following targets: build"
	@exit 2

# Empty rule to force other rules to be updated.
FORCE:



#### Build: main steps
build: FORCE backend frontend

backend: FORCE backend-pip
frontend: FORCE frontend-npm frontend-build



#### Build: substeps
backend-pip: FORCE
	pip install -U -r python-server/packages.pip

frontend-npm: FORCE
	rm -rf frontend/node_modules
	cd frontend; npm install

frontend-build: FORCE frontend-npm
	cd frontend; npm run -s build
