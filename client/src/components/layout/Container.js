import React, { Fragment } from 'react'

const Container = (props) => {
    return (
        <Fragment>
            <section className="container">
                {props.children}
            </section>
        </Fragment>
    )
}
export default Container
