import { UserModel } from "@/models/examples/user.model";
import { usersQueryOptions } from "@/services/examples/users.service";
import { PaginatedResponseModel } from "@/models/examples/paged-result.model";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import { Avatar } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const PAGE_SIZE = 5;

function UsersList() {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const { data, isFetching } = useQuery<PaginatedResponseModel<UserModel>>(
		usersQueryOptions(page, PAGE_SIZE),
	);

	return (
		<DataTable
			withTableBorder
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
			onRowClick={(row) =>
				navigate({
					to: "/examples/users/$userId",
					params: { userId: row.record.id },
				})
			}
		/>
	);
}

export default UsersList;
