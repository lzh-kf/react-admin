const proxyHistory = (props) => {

    let { push, replace, go, goBack, goForward } = props.history

    props.history.beforeEach = function (next) {
        const flag = true
        if (flag) {
            next()
        } else {
            console.log('暂无权限')
        }
    }

    props.history.go = function (n) {
        if (props.history.beforeEach) {
            props.history.beforeEach(() => {
                go(n)
            })
        } else {
            go(n)
        }
    }

    props.history.goBack = function () {
        if (props.history.beforeEach) {
            props.history.beforeEach(() => {
                goBack()
            })
        } else {
            goBack()
        }
    }

    props.history.goForward = function () {
        if (props.history.beforeEach) {
            props.history.beforeEach(() => {
                goForward()
            })
        } else {
            goForward()
        }
    }

    props.history.push = function (path, state) {
        if (props.history.beforeEach) {
            props.history.beforeEach(() => {
                push(path, state)
            })
        } else {
            push(path, state)
        }
    }

    props.history.replace = function (path, state) {
        if (props.history.beforeEach) {
            props.history.beforeEach(() => {
                replace(path, state)
            })
        } else {
            replace(path, state)
        }
    }

    return props
}

export default proxyHistory