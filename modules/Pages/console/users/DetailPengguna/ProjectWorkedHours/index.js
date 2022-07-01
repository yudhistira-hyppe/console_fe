import React, { useState } from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Box from '@material-ui/core/Box';
import AppDatePicker from '@jumbo/components/Common/formElements/AppDatePicker';
import ProjectWorkedGraph from './ProjectWorkedGraph';
import AppSelectBox from '@jumbo/components/Common/formElements/AppSelectBox';
import { getFormattedDate } from '@jumbo/utils/dateHelper';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { getTodayDate, getYesterdayDate } from '@jumbo/utils/dateHelper';
import { fakeDb } from 'modules/FakeDb/fake-db';

const { projects } = fakeDb;

const currentProject = projects[0];

const useStyles = makeStyles((theme) => ({
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      paddingLeft: 8,
      paddingRight: 8,
    },
    color: alpha(theme.palette.common.white, 0.74),
    '&:not(:first-child)': {
      borderLeft: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
    },
    '& .MuiSvgIcon-root': {
      marginRight: 12,
    },
  },
  backdropContent: {
    color: alpha(theme.palette.common.white, 0.74),
    '& .form-control': {
      marginBottom: 20,
      '& label, & .MuiInput-formControl, & .MuiSelect-icon, & .MuiIconButton-root': {
        color: alpha(theme.palette.common.white, 0.74),
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        borderBottomColor: alpha(theme.palette.common.white, 0.74),
      },
    },
  },
  cardContentRoot: {
    padding: '0 !important',
  },
  titleRoot: {
    letterSpacing: 0.15,
  },
  badgeRoot: {
    color: theme.palette.common.white,
    borderRadius: 30,
    fontSize: 12,
    padding: '2px 10px',
    display: 'inline-block',
  },
}));

const Project = ({ currentProject, setCurrentProject, startDate, setStartDate, endDate, setEndDate }) => {
  const handleChange = (event) => {
    setCurrentProject(projects.find((project) => project.value === event.target.value));
  };

  const onStartDateChange = (date) => {
    setStartDate(date);
  };

  const onEndDateChange = (date) => {
    setEndDate(date);
  };
  const classes = useStyles();

  return (
    <CmtCardContent>
      <Box className={classes.backdropContent}>
        <AppSelectBox
          label="Select Project"
          data={projects}
          valueKey="value"
          labelKey="label"
          value={currentProject.value}
          onChange={handleChange}
        />
        <AppDatePicker label="Start Date" value={startDate} onChange={onStartDateChange} />
        <AppDatePicker label="End Date" value={endDate} onChange={onEndDateChange} />
      </Box>
    </CmtCardContent>
  );
};

const ProjectHeader = ({ currentProject, startDate, endDate }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" mx={{ xs: -2, sm: -4 }}>
      <Box className={classes.headerItem}>
        <DashboardIcon />
        {currentProject.label}
      </Box>
      <Box className={classes.headerItem}>
        <CalendarTodayIcon />
        {getFormattedDate(startDate, ' DD MMM')} - {getFormattedDate(endDate, ' DD MMM')}
      </Box>
    </Box>
  );
};

const ProjectWorkedHours = () => {
  const actions = [
    {
      label: 'Today',
      value: getTodayDate(),
    },
    {
      label: 'Yesterday',
      value: getYesterdayDate(),
    },
    {
      label: 'This Week',
      value: 'this_week',
    },
  ];

  const [menu, setMenu] = useState('This Week');
  const classes = useStyles();

  const filterTableData = (event) => {
    setMenu(event.label);
    switch (event.value) {
      case getTodayDate(): {
        return;
        // setTableData(recentOrders.filter((item) => item.orderDate === event.value));
      }
      case getYesterdayDate(): {
        return;
        // setTaleData(recentOrders.filter((item) => item.orderDate === event.value));
      }
      case 'this_week': {
        return;
        // setTableData(
        //   recentOrders.filter((item) => item.orderDate !== getTodayDate() && item.orderDate !== getYesterdayDate()),
        // );
      }
      default:
        return;
      // setTableData(recentOrders);
    }
  };

  return (
    <CmtCard style={{ height: '100%' }}>
      <CmtCardHeader
        className="pt-4"
        title="Aktifitas"
        titleProps={{
          variant: 'h4',
          component: 'div',
          className: classes.titleRoot,
        }}
        actionsPos="top-corner"
        actions={actions}
        actionHandler={filterTableData}>
        <Box className={classes.badgeRoot} component="span" bgcolor="#FFDE99">
          {menu}
        </Box>
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContentRoot}>
        <ProjectWorkedGraph data={currentProject.data} color={currentProject.color} />
      </CmtCardContent>
    </CmtCard>
  );
};

export default ProjectWorkedHours;
