import type { Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
<% providerImports.forEach(function(providerImport) { %>
<%-`import { ${providerImport.serviceName} } from '@/shared/services/${providerImport.fileName}';`%> <%});%>

const providers: Provider[] = [<% providers.forEach(function(provider) { %>
  <%-provider%>, <%});%>
];

@Global()
@Module({
  providers,
  imports: [CqrsModule],
  exports: [...providers, CqrsModule],
})
export class SharedModule {}
