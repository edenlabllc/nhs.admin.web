import React from "react";
import { compose } from "redux";
import { withRouter } from "react-router";
import withStyles from "withStyles";
import Helmet from "react-helmet";
import classnames from "classnames";
import printIframe from "print-iframe";

import Line from "components/Line";
import DataList from "components/DataList";
import InlineList from "components/InlineList";
import WorkingHours from "components/WorkingHours";
import { H1 } from "components/Title";

import BackLink from "containers/blocks/BackLink";
import ShowMore from "containers/blocks/ShowMore";
import AddressesList from "containers/blocks/AddressesList";
import DictionaryValue from "containers/blocks/DictionaryValue";

import { CONTRACT_STATUS } from "helpers/enums";

import styles from "./styles.scss";

class ContractDetail extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { contract } = this.props;
    if (
      nextProps.contract.printout_content &&
      nextProps.contract.printout_content !== contract.printout_content &&
      (contract.status === "SIGNED" || contract.status === "NHS_SIGNED")
    ) {
      printIframe(nextProps.contract.printout_content);
    }
  }
  render() {
    if (!this.props.contract) return null;
    const { contract = {}, getPrintoutContent, router } = this.props;
    const fullName = obj =>
      [obj.last_name, obj.first_name, obj.second_name].join(" ");

    const getDivisionName = id => {
      const { name } = contract.contractor_divisions.find(i => id === i.id);
      return name;
    };
    let fec;
    if (contract.external_contractors) {
      fec = contract.external_contractors[0];
    }
    const contractorDivisions = contract.contractor_divisions.filter(Boolean);
    return (
      <div>
        <Helmet
          title={"Деталі контракту"}
          meta={[{ property: "og:title", content: "Деталі контракту" }]}
        />

        <BackLink onClick={() => router.goBack()}>
          Назад до списку запитів
        </BackLink>

        <Line />
        {contract.status === "SIGNED" || contract.status === "NHS_SIGNED" ? (
          contract.status === "NHS_SIGNED" || contract.status === "SIGNED" ? (
            <div className={styles.link}>
              <span onClick={() => printIframe(contract.printout_content)}>
                Дивитись друковану форму
              </span>
            </div>
          ) : (
            <div className={styles.link}>
              <span
                onClick={() => {
                  getPrintoutContent(contract.id);
                }}
              >
                Дивитись друковану форму
              </span>
            </div>
          )
        ) : null}
        <DataList
          list={[
            {
              name: "Статус запиту",
              value: contract.status && CONTRACT_STATUS[contract.status].title
            },
            {
              name: "Номер контракту",
              value: contract.contract_number
            }
          ]}
        />

        <Line />
        <div
          className={classnames({
            [styles.grey]:
              contract.status === "TERMINATED" ||
              contract.status === "APPROVED" ||
              contract.status === "DECLINE"
          })}
        >
          {contract.contractor_legal_entity && (
            <div>
              <H1>I. Медзаклад</H1>

              <DataList
                list={[
                  {
                    name: "ID медзакладу",
                    value: contract.contractor_legal_entity.id
                  },
                  {
                    name: "Назва",
                    value: contract.contractor_legal_entity.name
                  },
                  {
                    name: "Адреса",
                    value: (
                      <AddressesList
                        list={contract.contractor_legal_entity.addresses}
                      />
                    )
                  },
                  {
                    name: "ЄДРПОУ",
                    value: contract.contractor_legal_entity.edrpou
                  }
                ]}
              />
              <Line />
            </div>
          )}
          {contract.contractor_owner && (
            <div>
              <DataList
                list={[
                  {
                    name: "ID підписанта",
                    value: contract.contractor_owner.id
                  },
                  {
                    name: "Повне і'мя",
                    value: fullName(contract.contractor_owner.party)
                  }
                ]}
              />
              <Line />
            </div>
          )}
          <DataList
            list={[
              {
                name: "Термін дії договору",
                value: `З ${contract.start_date} по ${contract.end_date}`
              },
              {
                name: "Кількість осіб, що обслуговуються медзакладом",
                value: `${contract.contractor_rmsp_amount} (станом на 01.01.18)`
              }
            ]}
          />
          <Line />
          {contractorDivisions && contractorDivisions.length ? (
            <div>
              <H1>II. Додаток 2</H1>
              <div className={styles.forwardLink}>
                <BackLink
                  to={`/contract-requests/${contract.id}/division-employees/${
                    contractorDivisions[0].id
                  }`}
                  iconPosition={"right"}
                >
                  Показати співробітників
                </BackLink>
              </div>
              <H1>Відділення</H1>
              <DataList
                list={[
                  {
                    name: "ID відділення",
                    value: contractorDivisions[0].id
                  },
                  {
                    name: "Назва",
                    value: contractorDivisions[0].name
                  },
                  {
                    name: "Адреса",
                    value: (
                      <AddressesList list={contractorDivisions[0].addresses} />
                    )
                  },
                  {
                    name: "Гірський регіон",
                    value: contractorDivisions[0].mountain_group ? "Так" : "Ні"
                  },
                  {
                    name: "Телефон",
                    value: (
                      <InlineList
                        list={contractorDivisions[0].phones.map(
                          item => item.number
                        )}
                      />
                    )
                  },
                  {
                    name: "Email",
                    value: contractorDivisions[0].email
                  },
                  {
                    name: "Графік роботи",
                    value: contractorDivisions[0].working_hours && (
                      <WorkingHours
                        workingHours={contractorDivisions[0].working_hours}
                      />
                    )
                  }
                ]}
              />
              {contractorDivisions.length > 1 && (
                <div>
                  <Line />
                  <ShowMore
                    name={`Показати інші відділення (${contract
                      .contractor_divisions.length - 1})`}
                    show_block
                  >
                    {contractorDivisions.map((i, key) => {
                      if (key === 0) return null;
                      return (
                        <div key={key}>
                          {key !== 0 && <Line />}
                          <div className={styles.forwardLink}>
                            <BackLink
                              to={`/contract-requests/${
                                contract.id
                              }/division-employees/${i.id}`}
                              iconPosition={"right"}
                            >
                              Показати співробітників
                            </BackLink>
                          </div>
                          <H1>Відділення</H1>
                          <DataList
                            list={[
                              {
                                name: "ID відділення",
                                value: i.id
                              },
                              {
                                name: "Назва",
                                value: i.name
                              },
                              {
                                name: "Адреса",
                                value: <AddressesList list={i.addresses} />
                              },
                              {
                                name: "Гірський регіон",
                                value: i.mountain_group ? "Так" : "Ні"
                              },
                              {
                                name: "Телефон",
                                value: (
                                  <InlineList
                                    list={i.phones.map(item => item.number)}
                                  />
                                )
                              },
                              {
                                name: "Email",
                                value: i.email
                              },
                              {
                                name: "Графік роботи",
                                value: i.working_hours && (
                                  <WorkingHours
                                    workingHours={i.working_hours}
                                  />
                                )
                              }
                            ]}
                          />
                        </div>
                      );
                    })}
                  </ShowMore>
                </div>
              )}
            </div>
          ) : null}
          {contract.external_contractors &&
            contract.external_contractors.length && (
              <div>
                <Line />
                <H1>Підрядники</H1>
                <DataList
                  list={[
                    {
                      name: "Номер договору",
                      value: `№${fec.contract.number} від ${
                        fec.contract.issued_at
                      } по ${fec.contract.expires_at}`
                    }
                  ]}
                />
                <br />
                <DataList
                  list={[
                    {
                      name: "Відділення",
                      value: (
                        <div>
                          <div className={styles.divisionList}>
                            <div>{getDivisionName(fec.divisions[0].id)}</div>
                            <div>ID {fec.divisions[0].id}</div>
                            <div>
                              Послуга, що надається:{" "}
                              {fec.divisions[0].medical_service}
                            </div>
                          </div>
                          {fec.divisions.length > 1 && (
                            <ShowMore
                              name={`Показати інші відділення (${fec.divisions
                                .length - 1})`}
                              show_block
                            >
                              {fec.divisions.map((item, key) => {
                                if (key === 0) return null;
                                return (
                                  <div
                                    key={key}
                                    className={styles.divisionList}
                                  >
                                    <div>{getDivisionName(item.id)}</div>
                                    <div>ID {item.id}</div>
                                    <div>
                                      Послуга, що надається:{" "}
                                      {item.medical_service}
                                    </div>
                                  </div>
                                );
                              })}
                            </ShowMore>
                          )}
                        </div>
                      )
                    }
                  ]}
                />
                {contract.external_contractors.length > 1 && (
                  <div>
                    <Line />
                    <ShowMore
                      name={`Показати всіх підрядників (${contract
                        .external_contractors.length - 1})`}
                      show_block
                    >
                      {contract.external_contractors.map((i, key) => {
                        if (key === 0) return null;
                        return (
                          <div key={key}>
                            <DataList
                              list={[
                                {
                                  name: "Номер договору",
                                  value: `№${i.contract.number} від ${
                                    i.contract.issued_at
                                  } по ${i.contract.expires_at}`
                                }
                              ]}
                            />
                            <br />
                            <DataList
                              list={[
                                {
                                  name: "Відділення",
                                  value: (
                                    <div>
                                      <div className={styles.divisionList}>
                                        <div>
                                          {getDivisionName(i.divisions[0].id)}
                                        </div>
                                        <div>ID {i.divisions[0].id}</div>
                                        <div>
                                          Послуга, що надається:{" "}
                                          {i.divisions[0].medical_service}
                                        </div>
                                      </div>
                                      {i.divisions.length > 1 && (
                                        <ShowMore
                                          name={`Показати інші відділення (${i
                                            .divisions.length - 1})`}
                                          show_block
                                        >
                                          {i.divisions.map((item, key) => {
                                            if (key === 0) return null;
                                            return (
                                              <div
                                                key={key}
                                                className={styles.divisionList}
                                              >
                                                <div>
                                                  {getDivisionName(item.id)}
                                                </div>
                                                <div>ID {item.id}</div>
                                                <div>
                                                  Послуга, що надається:{" "}
                                                  {item.medical_service}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </ShowMore>
                                      )}
                                    </div>
                                  )
                                }
                              ]}
                            />
                          </div>
                        );
                      })}
                    </ShowMore>
                    <Line />
                  </div>
                )}
              </div>
            )}
          {contract.nhs_signer && (
            <div>
              <Line />
              <DataList
                list={[
                  {
                    name: "Підписант зі сторони замовника",
                    value: fullName(contract.nhs_signer.party)
                  },
                  {
                    name: "Що діє на підставі",
                    value: contract.nhs_signer_base
                  },
                  {
                    name: "Ціна договору",
                    value: `${contract.nhs_contract_price} грн`
                  },
                  {
                    name: "Спосіб оплати",
                    value: (
                      <DictionaryValue
                        dictionary="CONTRACT_PAYMENT_METHOD"
                        value={contract.nhs_payment_method}
                      />
                    )
                  },
                  {
                    name: "Місто укладення договору",
                    value: contract.issue_city
                  }
                ]}
              />
              <Line />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default compose(withRouter, withStyles(styles))(ContractDetail);
