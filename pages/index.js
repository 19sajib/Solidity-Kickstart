import React, { useEffect } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

const index = ({ campaigns }) => {
  const renderCampigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
        <Link route={`/campaigns/${address}`}>
        <a>View Campaign</a>
        </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>

        <Link route="/campaigns/new">
          <a>
            <Button animated primary floated="right">
              <Button.Content visible>Create Campaign</Button.Content>
              <Button.Content hidden>
                <Icon name="idea" />
              </Button.Content>
            </Button>
          </a>
        </Link>

        {renderCampigns()}
      </div>
    </Layout>
  );
};

index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns };
};

export default index;
