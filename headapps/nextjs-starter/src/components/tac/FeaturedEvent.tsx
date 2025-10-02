import {
  Text,
  Image,
  withDatasourceCheck,
  Link,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { BaseContentFields } from 'lib/component-props/events';
import { ComponentProps } from 'lib/component-props';
import NextLink from 'next/link';
import { JSX } from 'react';

type FeaturedEventProps = ComponentProps &
  BaseContentFields & {
    fields: {
      FeaturedLink: LinkField;
    };
    params: {
      cssClass: string;
    };
  };

type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component featured-event ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">{props.children}</div>
    </div>
  );
};

const NoImageFeatuedEvent = (props: FeaturedEventProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <ComponentContent id={id} styles={props.params.styles}>
      <div className="no-image card">
        <div className="card-body">
          <h5 className="card-title">
            <Text field={props.fields.Title} />
          </h5>
          <p className="card-text">
            <Text field={props.fields.Intro} />
          </p>
          <NextLink href="/" className={props.params.cssClass}>
            {props.params.message}
          </NextLink>
        </div>
      </div>
    </ComponentContent>
  );
};
export const NoImage = withDatasourceCheck()(NoImageFeatuedEvent);

const FeaturedEvent = (props: FeaturedEventProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  return (
    <ComponentContent id={id} styles={props.params.styles}>
      <div className="card">
        <Image field={props.fields.NavigationImage} className="img-fluid" />
        <div className="card-body">
          <h3 className="card-title">
            <Text field={props.fields.Title} />
          </h3>
          <p className="card-text">
            <Text field={props.fields.Intro} />
          </p>
          <Link
            field={props.fields.FeaturedLink || '/'}
            className={props.params.cssClass}
            editable={false}
          >
            Learn More
          </Link>
        </div>
      </div>
    </ComponentContent>
  );
};

export const Default = withDatasourceCheck()(FeaturedEvent);
