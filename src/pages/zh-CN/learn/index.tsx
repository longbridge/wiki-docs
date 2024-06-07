import ApplicationLayout from "@site/src/components/layout/application";
import { WikiList } from "@site/src/components/wiki-list";

export default function Home() {
  return (
    <ApplicationLayout>
      <WikiList />
    </ApplicationLayout>
  );
}
