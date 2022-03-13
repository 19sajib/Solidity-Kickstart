import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

    const campaign = Campaign(address)

    setLoading(true)
    setErrorMsg("")

    try {
        const accounts = await web3.eth.getAccounts();

        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(value, 'ether')
        });

        Router.replaceRoute(`/campaigns/${address}`)

    } catch(err) {
        setErrorMsg(err.message);
    }
    setValue('')
    setLoading(false)
  }

  return (
    <Form onSubmit={onSubmit} error={!!errorMsg} >
      <h4>Contribute to this campaign</h4>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMsg} />
      <Button loading={loading} primary>Contribute!</Button>
    </Form>
  );
};

export default ContributeForm;
