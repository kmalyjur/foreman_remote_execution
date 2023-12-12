import React from 'react';
import PropTypes from 'prop-types';
// TODO: delete the line:
// eslint-disable-next-line import/no-extraneous-dependencies
import prettycron from 'prettycron';
import { translate as __, documentLocale } from 'foremanReact/common/I18n';
import {
  Button,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
} from '@patternfly/react-core';
import DefaultLoaderEmptyState from 'foremanReact/components/HostDetails/DetailsCard/DefaultLoaderEmptyState';
import { DATE_OPTIONS } from '../JobInvocationConstants';
import '../JobInvocationDetail.scss';

const JobInvocationSchedule = ({ recurrence, scheduling }) => {
  const {
    id,
    cron_line: cronLine,
    // TODO: end_time: endTime, ERROR: IS ALWAYS NULL, add specific time option to "ends:"
    iteration: currentIteration,
    max_iteration: maxIteration,
    state,
  } = recurrence || {};
  const startsAtFormatted =
    scheduling && scheduling.start_at
      ? new Date(scheduling.start_at).toLocaleString(
          documentLocale(),
          DATE_OPTIONS
        )
      : null;
  const startsBeforeFormatted =
    scheduling && scheduling.start_before
      ? new Date(scheduling.start_before).toLocaleString(
          documentLocale(),
          DATE_OPTIONS
        )
      : null;

  const getEnds =
    maxIteration && currentIteration
      ? __(
          `After ${maxIteration} occurences (${currentIteration}/${maxIteration})`
        )
      : __('Never');

  return (
    <>
      {recurrence && (
        <DescriptionList isHorizontal isFluid isAutoColumnWidths>
          <DescriptionListGroup>
            <DescriptionListTerm>{__('State:')}</DescriptionListTerm>
            <DescriptionListDescription>
              {state ? (
                state.charAt(0).toUpperCase() + state.slice(1)
              ) : (
                <DefaultLoaderEmptyState />
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{__('Repeats:')}</DescriptionListTerm>
            <DescriptionListDescription>
              {cronLine ? (
                prettycron.toString(cronLine) // TODO: different format
              ) : (
                <DefaultLoaderEmptyState />
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          {!maxIteration && (
            <DescriptionListGroup>
              <DescriptionListTerm>
                {__('Current iteration:')}
              </DescriptionListTerm>
              <DescriptionListDescription>
                {currentIteration || <DefaultLoaderEmptyState />}
              </DescriptionListDescription>
            </DescriptionListGroup>
          )}
          <DescriptionListGroup>
            <DescriptionListTerm>{__('Ends:')}</DescriptionListTerm>
            <DescriptionListDescription>
              {getEnds || <DefaultLoaderEmptyState />}
            </DescriptionListDescription>
          </DescriptionListGroup>
          {id && (
            <DescriptionListGroup>
              <DescriptionListDescription>
                <Button
                  ouiaId="template-link"
                  variant="link"
                  component="a"
                  isInline
                  // TODO: isDisabled={!canEditJobTemplates}
                  href={`/foreman_tasks/recurring_logics/${id}`}
                >
                  {__('View recurring logic')}
                </Button>
              </DescriptionListDescription>
            </DescriptionListGroup>
          )}
        </DescriptionList>
      )}
      {scheduling && (
        <DescriptionList isHorizontal isFluid isAutoColumnWidths>
          <DescriptionListGroup>
            <DescriptionListTerm>{__('Starts at:')}</DescriptionListTerm>
            <DescriptionListDescription>
              {startsAtFormatted}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{__('Starts before:')}</DescriptionListTerm>
            <DescriptionListDescription>
              {startsBeforeFormatted}
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      )}
    </>
  );
};

JobInvocationSchedule.propTypes = {
  recurrence: PropTypes.object,
  scheduling: PropTypes.object,
};

JobInvocationSchedule.defaultProps = {
  recurrence: null,
  scheduling: null,
};

export default JobInvocationSchedule;
