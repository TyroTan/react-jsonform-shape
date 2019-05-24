import * as ReactDOM from 'react-dom';
window.ReactDOM = ReactDOM;

import React from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";

const DynamicForm = require( "../../src/lib/index.js");
const { useState } = React;
const Option = Select.Option;

const ColStyled = props => {
  return (
    <Col
      {...props}
      style={{ border: `1px solid ${props.color}`, height: "100px" }}
    />
  );
};

const Test1 = props => {
  const { form } = props;
  const { getFieldDecorator } = form;

  const mapContainerColor = color => {
    const m = { red: "10", orange: "11", yellow: "12" };
    return m[color];
  };

  const pushItem = () => {
    setState(prevState => ({
      ...prevState,
      items: [
        ...prevState.items,
        {
          container: mapContainerColor(prevState.addState.containerColor),
          md: parseInt(prevState.addState.md),
          propsItem: getNewField(`field${prevState.items.length}`)
        }
      ]
    }));
  };

  const getNewField = fieldName => {
    return {
      name: fieldName,
      placeholder: `${fieldName} placeholder`,
      // some more Input Control props
    };
  };

  const [state, setState] = useState({
    addState: {
      md: 6,
      containerColor: "red"
    },
    items: []
  });

  const renderContainer0 = ({ getContents }) => {
    return (
      <ColStyled color="blue" md={6}>
        <Row type="flex" style={{ flexDirection: "column" }}>
          <ColStyled color="violet" md={6}>
            <Button
              id="add"
              onClick={() => {
                pushItem();
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                setState(prevState => ({
                  ...prevState,
                  items: []
                }));
              }}
            >
              reset
            </Button>
          </ColStyled>
          <ColStyled color="violet" md={6}>
            <Button htmlType="submit">Submit</Button>
          </ColStyled>

          <ColStyled color="violet" md={12}>
            <Select
              defaultValue="6"
              style={{ width: 120 }}
              onChange={value =>
                setState(prevState => ({
                  ...prevState,
                  addState: {
                    ...prevState.addState,
                    md: value
                  }
                }))
              }
            >
              <Option value="6">6</Option>
              <Option value="8">8</Option>
              <Option value="12">12</Option>
            </Select>
            <Select
              placeholder="Container Color"
              defaultValue="red"
              style={{ width: 120 }}
              onChange={value =>
                setState(prevState => ({
                  ...prevState,
                  addState: {
                    ...prevState.addState,
                    containerColor: value
                  }
                }))
              }
            >
              <Option value="red">Red</Option>
              <Option value="orange">Orange</Option>
              <Option value="yellow">Yellow</Option>
            </Select>
          </ColStyled>
        </Row>
      </ColStyled>
    );
  }

  const renderContainer1 = ({ getContents }) => {
    return (
      <ColStyled color="indigo" md={18}>
        <Row gutter={32}>{getContents()}</Row>
      </ColStyled>
    );
  }

  const renderContainer10 = ({ getContents }) => {
    return (
      <ColStyled color="red" md={12}>
        <Row gutter={16}>{getContents()}</Row>
      </ColStyled>
    );
  }

  const renderItemContainer10 = ({ ControlType, type, propsItem, md } = {}) => {
    return (
      <ColStyled color="black" md={md}>
        <ControlType {...propsItem} />
      </ColStyled>
    );
  }

  const renderContainer11 = ({ getContents }) => {
    return (
      <ColStyled color="orange" md={12}>
        <Row gutter={16}>{getContents()}</Row>
      </ColStyled>
    );
  }

  const renderItemContainer11 = ({ ControlType, type, propsItem, md } = {}) => {
    return (
      <ColStyled color="black" md={md}>
        <ControlType {...propsItem} />
      </ColStyled>
    );
  }

  const renderContainer12 = ({ getContents }) => {
    return (
      <ColStyled color="yellow" md={24}>
        <Row gutter={16}>{getContents()}</Row>
      </ColStyled>
    );
  }

  const renderItemContainer12 = ({ ControlType, type, propsItem, md } = {}) => {
    return (
      <ColStyled color="black" md={md}>
        <ControlType {...propsItem} />
      </ColStyled>
    );
  }

  return (
    <Row style={{ margin: "48px" }}>
      <Col md={24}>
        <DynamicForm
          render={({ getContents }) => {
            return (
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  form.validateFieldsAndScroll(async (err, values) => {
                    if (!err)
                      setState(prev => ({
                        submitResult: JSON.stringify(values)
                      }));
                  });
                }}
              >
                <Row gutter={48}>{getContents()}</Row>
              </Form>
            );
          }}
          template={{
            contents: [
              {
                container: "0",
                render: renderContainer0
              },
              {
                container: "1",
                render: renderContainer1
              },
              {
                container: "10",
                render: renderContainer10,
                renderItem: renderItemContainer10
              },
              {
                container: "11",
                render: renderContainer11,
                renderItem: renderItemContainer11
              },
              {
                container: "12",
                render: renderContainer12,
                renderItem: renderItemContainer12
              }
            ]
          }}
          ControlComponents={{ Button, Form, Input }}
          items={state.items}
        />
        <div>{state.submitResult}</div>
      </Col>
    </Row>
  );
};

const WrappedTest1 = Form.create({})(Test1);

describe("Add input fields dynamically", () => {
  it("works", () => {
    // mount the component under test
    cy.mount(<Row><Col><WrappedTest1 /></Col></Row>);
    cy.get("input").should('have.length', 0);
    cy.get("#add").click();
    cy.get("input").should('have.length', 1);
    /*cy.get("#formSubmitBtn").click();
    cy.get("#submitResult").contains(`"field1":"field1"`);
    cy.get("#submitResult").contains(`"field2":"field2"`);
    cy.get("#submitResult").contains(`"field3":"field3"`);
    cy.get("#submitResult").contains(`"field4":"field4"`);
    cy.get("#submitResult").contains(`"field5":"field5"`);*/
  });
});
