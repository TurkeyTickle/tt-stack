import { UserModel } from "@/models/examples/user.model";
import { usersQueryOptions } from "@/services/examples/users.service";
import { PaginatedResponseModel } from "@/models/examples/paged-result.model";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import { Avatar } from "@mantine/core";
import { useState } from "react";

const PAGE_SIZE = 5;

interface Props {
	onUserSelected: (user: UserModel) => void;
}

function UsersList({ onUserSelected }: Props) {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery<PaginatedResponseModel<UserModel>>(
    usersQueryOptions(page, PAGE_SIZE),
  );

  return (
    <DataTable
      withTableBorder
      minHeight={350}
      columns={[
        { accessor: "id" },
        {
          accessor: "avatar",
          render: (record) => <Avatar src={record.avatar} />,
        },
        { accessor: "first_name" },
        { accessor: "last_name" },
        { accessor: "email" },
      ]}
      records={data?.data ?? []}
      totalRecords={data?.total}
      page={page}
      recordsPerPage={PAGE_SIZE}
      onPageChange={(p) => setPage(p)}
      fetching={isFetching}
      loaderType="dots"
      onRowClick={(row) => onUserSelected(row.record)}
    />
  );
}

export default UsersList;
