import React from "react";
import { compose } from "redux";
import { withRouter } from "react-router";
import { provideHooks } from "redial";
import { connect } from "react-redux";
import Helmet from "react-helmet";

import { setFilter, getFilter } from "helpers/filter";

import { ListHeader, ListShowBy, ListTable } from "components/List";
import { H1, H2 } from "components/Title";
import Pagination from "components/Pagination";
import Table from "components/Table";

import ShowBy from "containers/blocks/ShowBy";
import SearchForm from "containers/forms/SearchForm";
import SearchFilterField from "containers/forms/SearchFilterField";

import { getPartyUsers } from "reducers";
import uuidValidate from "helpers/validators/uuid-validate";

import { fetchPartyUsers } from "./redux";

const SEARCH_FIELDS = [
  {
    component: SearchFilterField,
    title: "Знайти обліковий запис",
    filters: [
      { name: "user_id", title: "За ID користувача", validate: uuidValidate },
      { name: "party_id", title: "За ID особи", validate: uuidValidate }
    ]
  }
];

const PartyUsersListPage = ({ location, router, party_users = [], paging }) => (
  <div id="party-users-list-page">
    <Helmet
      title="Облікові записи"
      meta={[{ property: "og:title", content: "Облікові записи" }]}
    />
    <ListHeader>
      <H1>Облікові записи</H1>
    </ListHeader>

    <div>
      <H2>Пошук облікового запису</H2>
      <SearchForm fields={SEARCH_FIELDS} location={location} />
    </div>

    <ListShowBy>
      <ShowBy
        active={Number(location.query.page_size) || 5}
        onChange={page_size => setFilter({ page_size }, { location, router })}
      />
    </ListShowBy>

    <ListTable id="party-users-table">
      <Table
        columns={[
          { key: "id", title: "ID" },
          { key: "user_id", title: "ID користувача" },
          { key: "party_id", title: "ID особи" },
          { key: "name", title: "Ім'я" },
          { key: "birth_date", title: "Дата народження" }
        ]}
        data={party_users.map(
          ({
            id,
            user_id,
            party_id,
            last_name,
            first_name,
            second_name,
            birth_date
          }) => ({
            id,
            user_id,
            party_id,
            name: `${last_name} ${first_name} ${second_name}`,
            birth_date
          })
        )}
      />
    </ListTable>

    {paging.total_pages > 1 && (
      <Pagination
        currentPage={paging.page_number}
        totalPage={paging.total_pages}
        location={location}
      />
    )}
  </div>
);

export default compose(
  withRouter,
  provideHooks({
    fetch: ({ dispatch, location: { query } }) =>
      dispatch(fetchPartyUsers({ page_size: 5, ...query }))
  }),
  connect((state, props) => ({
    ...state.pages.PartyUsersListPage,
    party_users: getPartyUsers(state, state.pages.PartyUsersListPage.partyUsers)
  }))
)(PartyUsersListPage);
