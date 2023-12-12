import React from 'react';
import PropTypes from 'prop-types';
import { ExpandableSection } from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';

import JobInvocationSchedule from './JobInvocationSchedule';
import JobInvocationTargetHost from './JobInvocationTargetHost';
import JobInvocationAdvancedSettings from './JobInvocationAdvancedSettings';
import JobInvocationInputs from './JobInvocationInputs';

const AdditionalInformation = ({ data }) => {
  const { recurrence, scheduling } = data;

  const [isExpanded, setIsExpanded] = React.useState(false);
  // eslint-disable-next-line no-shadow
  const onToggle = isExpanded => {
    setIsExpanded(isExpanded);
  };

  return (
    <ExpandableSection
      toggleText={
        isExpanded ? __('Show less information') : __('Show more information')
      }
      onToggle={onToggle}
      isExpanded={isExpanded}
    >
      {(recurrence || scheduling) && (
        <ExpandableSection toggleText="Schedule">
          <JobInvocationSchedule
            recurrence={recurrence}
            scheduling={scheduling}
          />
        </ExpandableSection>
      )}
      <ExpandableSection toggleText="Target host">
        <JobInvocationTargetHost data={data} />
      </ExpandableSection>
      <ExpandableSection toggleText="Advanced settings">
        <JobInvocationAdvancedSettings data={data} />
      </ExpandableSection>
      <ExpandableSection toggleText="Inputs">
        <JobInvocationInputs data={data} />
      </ExpandableSection>
    </ExpandableSection>
  );
};

AdditionalInformation.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AdditionalInformation;
